import { useEffect, useState, FormEvent } from 'react';

import { Header } from '../components/Header';
import { CardsFilmes, Filme } from '../components/CardsFilme';
import { FormFilme } from '../components/FormFilme';
import { FormSessao } from '../components/FormSessao';
import { CardSessao, Sessao } from '../components/CardsSessao';
import { CardsOferta, Oferta } from '../components/CardsOferta';
import { Footer } from '../components/Footer';

import atencaoIcon from '../assets/atencao.svg';
import qrcode from '../assets/QRCode_Fácil.png';

import '../styles/home.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import api from '../services/api';

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  padding: '0px',
  p: 4,
};

export function Home() {
  const [openModalCliente, setOpenModalCliente] = useState(false);
  const handleOpenModalCliente = () => setOpenModalCliente(true);
  const handleCloseModalCliente = () => setOpenModalCliente(false);

  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const handleOpenModalVoucher = () => setOpenModalVoucher(true);
  const handleCloseModalVoucher = () => {
    setOpenModalVoucher(false);
    handleListItemClick(1);
    setOfertasSelecionadas([]);
    setDescontos([]);
    setDescontoTotal(0);
    setValorTotal(0);
  };
  const [nome, setNome] = useState('');
  const [categoriaCliente, setCategoriaCliente] = useState('adulto');
  const [formaPagamento, setFormaPagamento] = useState('credito'); //Nome do cliente
  const [descontos, setDescontos] = useState<any[]>([]);
  const [descontoTotal, setDescontoTotal] = useState(0);

  const [filmes, setFilmes] = useState<any[]>([]);
  const [sessoes, setSessoes] = useState<any[]>([]);
  const [ofertas, setOfertas] = useState<any[]>([]);

  const [dataSessao, setDataSessao] = useState('');

  //Informações para compra
  const [filmeSelect, setFilmeSelect] = useState<Filme>({
    id: 0,
    atores: [],
    categoria: '',
    censura: 0,
    duracao: 0,
    empresa: '',
    isestreia: false,
    isnacional: false,
    nome: '',
  });
  const [sessaoSelect, setSessaoSelect] = useState<Sessao>({
    id: 0,
    data: new Date(),
    filmeid: 0,
    hora: '',
    salaid: 0,
    valor: 0,
    livre: false,
  });
  const [ofertasSelecionadas, setOfertasSelecionadas] = useState<any[]>([]);
  const [valorTotal, setValorTotal] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  useEffect(() => {
    getFilmes();
  }, [selectedIndex]);

  useEffect(() => {
    getSessoes();
  }, [filmeSelect, dataSessao]);

  useEffect(() => {
    let newValorTotal = sessaoSelect.valor;
    ofertasSelecionadas.forEach((oferta: Oferta) => {
      newValorTotal = Number(newValorTotal) + Number(oferta.valor);
    });
    setValorTotal(newValorTotal);
  }, [ofertasSelecionadas]);

  //Selecionar opção do header
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  const opComprarFilmeListSessions = (filme: Filme) => {
    setFilmeSelect(filme);
    handleListItemClick(5);
  };
  const opComprarSessaoListOfertas = (sessao: Sessao) => {
    setValorTotal(sessao.valor);
    setSessaoSelect(sessao);
    getOfertas();
    handleListItemClick(6);
  };
  const opComprarOferta = (oferta_compra: Oferta, op: boolean) => {
    if (!op) {
      //Retirar
      const newOfertasSelect = ofertasSelecionadas?.filter(
        oferta => oferta.id !== oferta_compra.id
      );
      setOfertasSelecionadas(newOfertasSelect);
    } else {
      setOfertasSelecionadas(oldArray => [
        ...ofertasSelecionadas,
        oferta_compra,
      ]);
    }
  };
  const getDescontoValor = () => {
    var listDesconto = [];
    var somatorioDesconto = 0;
    if (formaPagamento == 'credito' && categoriaCliente != 'flamenguista') {
      //Mais 10% sobre o valor do ingresso
      listDesconto.push({
        nome: 'Pagamento no crédito + 10%',
        valor: sessaoSelect.valor * 0.1,
      });
      somatorioDesconto += sessaoSelect.valor * 0.1 * 1;
    }

    if (categoriaCliente == 'flamenguista') {
      //Valor do ingresso igual a 0
      listDesconto.push({
        nome: 'Flamenguista não paga nada',
        valor: -1 * sessaoSelect.valor,
      });
      somatorioDesconto += -1 * sessaoSelect.valor;
    } else if (categoriaCliente == 'infantil') {
      //só paga 25% do valor do ingresso
      listDesconto.push({
        nome: 'Infantil paga apenas 25% do ingresso',
        valor: -1 * (sessaoSelect.valor * 0.75),
      });
      somatorioDesconto += -1 * (sessaoSelect.valor * 0.75);
    } else if (categoriaCliente == 'estudante' || categoriaCliente == 'idoso') {
      //Só paga 50% do valor do ingresso
      listDesconto.push({
        nome: 'Meia entrada',
        valor: -1 * (sessaoSelect.valor * 0.5),
      });
      somatorioDesconto += -1 * (sessaoSelect.valor * 0.5);
    }

    console.log(somatorioDesconto, listDesconto);
    setDescontos(listDesconto);
    setDescontoTotal(somatorioDesconto);
  };

  const getFilmes = () => {
    api
      .get('filme')
      .then(response => {
        setFilmes(response.data);
      })
      .catch(() => {
        alert('Erro ao listar filmes.');
      });
  };
  const getSessoes = () => {
    let idFilmeSelecionado = filmeSelect?.id ? filmeSelect?.id : 0;
    api
      .get('sessao/' + idFilmeSelecionado + '?date=' + dataSessao)
      .then(response => {
        setSessoes(response.data);
      })
      .catch(() => {
        alert('Erro ao listar sessoes.');
      });
  };
  const getOfertas = () => {
    api
      .get('item')
      .then(response => {
        setOfertas(response.data);
      })
      .catch(() => {
        alert('Erro ao listar filmes.');
      });
  };
  function handleCreateClienteCompra(e: FormEvent) {
    e.preventDefault();
    let itemsComprados: any[] = [];
    ofertasSelecionadas.map((oferta: Oferta) => {
      itemsComprados.push({ itemId: oferta.id, preco: oferta.valor });
    });
    let sessaoComprada = {
      sessaoId: sessaoSelect.id,
      valor: sessaoSelect.valor,
    };
    api
      .post('purchase', {
        nome,
        itens: itemsComprados,
        sessao: sessaoComprada,
      })
      .then(() => {
        alert('Compra realizada com sucesso');
        getDescontoValor();
        handleCloseModalCliente();
        handleOpenModalVoucher();
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  }
  return (
    <div id="home">
      <Header isHome>
        <h1>Cinema Sauro</h1>
      </Header>

      <div className="container-buttons">
        <button
          className={`${
            selectedIndex == 1
              ? 'button-create-profissional select'
              : 'button-create-profissional'
          }`}
          onClick={() => {
            handleListItemClick(1);
          }}
        >
          Estreias
        </button>
        <button
          className={`${
            selectedIndex == 2
              ? 'button-create-profissional select'
              : 'button-create-profissional'
          }`}
          onClick={() => {
            handleListItemClick(2);
          }}
        >
          Filmes
        </button>
        <button
          className={`${
            selectedIndex == 3
              ? 'button-create-profissional select'
              : 'button-create-profissional'
          }`}
          onClick={() => {
            handleListItemClick(3);
          }}
        >
          Cadastrar Filme
        </button>
        <button
          className={`${
            selectedIndex == 4
              ? 'button-create-profissional select'
              : 'button-create-profissional'
          }`}
          onClick={() => {
            handleListItemClick(4);
          }}
        >
          Cadastrar Sessão
        </button>
      </div>

      <main className="content__container">
        {selectedIndex === 1 &&
          (filmes.length === 0 ? (
            <p className="no-profissional">Nenhuma estreia cadastrado.</p>
          ) : (
            <>
              {filmes.map((filme: Filme) => {
                if (filme.isestreia) {
                  return (
                    <CardsFilmes
                      filme={filme}
                      fcompra={opComprarFilmeListSessions}
                      key={filme.id}
                    />
                  );
                }
              })}
            </>
          ))}
        {selectedIndex === 2 &&
          (filmes.length === 0 ? (
            <p className="no-profissional">Nenhum filme cadastrado.</p>
          ) : (
            <>
              {filmes.map((filme: Filme) => {
                return (
                  <CardsFilmes
                    filme={filme}
                    fcompra={opComprarFilmeListSessions}
                    key={filme.id}
                  />
                );
              })}
            </>
          ))}

        {selectedIndex === 3 && <FormFilme fback={handleListItemClick} />}
        {selectedIndex === 4 && <FormSessao fback={handleListItemClick} />}
        {selectedIndex === 5 &&
          (sessoes.length === 0 ? (
            <>
              <label htmlFor="data_sessao">Data da Sessão</label>
              <input
                type="date"
                id="data_sessao"
                min={new Date().toISOString().split('T')[0]}
                value={dataSessao}
                onChange={e => {
                  setDataSessao(e.target.value);
                }}
              />
              <p className="no-profissional">
                Nenhuma sessao cadastrado para essa data.
              </p>
            </>
          ) : (
            <>
              <label htmlFor="data_sessao">Data da Sessão</label>
              <input
                type="date"
                id="data_sessao"
                min={new Date().toISOString().split('T')[0]}
                value={dataSessao}
                onChange={e => {
                  setDataSessao(e.target.value);
                }}
              />
              {sessoes.map((sessao: Sessao) => {
                return (
                  <CardSessao
                    sessao={sessao}
                    filme={filmeSelect}
                    fcompra={opComprarSessaoListOfertas}
                    key={sessao.id}
                  />
                );
              })}
            </>
          ))}
        {selectedIndex === 6 &&
          (ofertas.length === 0 ? (
            <p className="no-profissional">Nenhuma oferta cadastrado.</p>
          ) : (
            <>
              {ofertas.map((oferta: Oferta) => {
                return (
                  <CardsOferta
                    oferta={oferta}
                    fcompra={opComprarOferta}
                    key={oferta.id}
                  />
                );
              })}
            </>
          ))}
      </main>
      {selectedIndex === 6 && (
        <Footer valorTotal={valorTotal} fcomprar={handleOpenModalCliente} />
      )}

      <Modal
        open={openModalCliente}
        onClose={handleCloseModalCliente}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal} className="container-form">
          <form onSubmit={handleCreateClienteCompra}>
            <label htmlFor="Name">Seu nome</label>
            <input
              type="text"
              id="Nome"
              value={nome}
              onChange={e => {
                setNome(e.target.value);
              }}
            />
            <label htmlFor="Pagamento">Forma de Pagamento</label>
            <select
              id="Pagamento"
              onChange={e => {
                setFormaPagamento(e.target.value);
              }}
            >
              <option value="credito">Crédito</option>
              <option value="debito">Debito</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
            <label htmlFor="cliente-categoria">Categoria do cliente</label>
            <select
              id="cliente-categoria"
              onChange={e => {
                setCategoriaCliente(e.target.value);
              }}
            >
              <option value="adulto">adulto</option>
              <option value="estudante">estudante</option>
              <option value="infantil">infantil</option>
              <option value="idoso">idoso</option>
              <option value="flamenguista">flamenguista</option>
            </select>
            <div id="submit" className="btn-cliente">
              <div id="content-submit">
                <div>
                  <img src={atencaoIcon} alt="Atenção" />
                  <p>
                    Importante! <br />
                    Preencha todos os dados
                  </p>
                </div>

                <button type="submit">Continuar</button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openModalVoucher}
        onClose={handleCloseModalVoucher}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal} className="container-form">
          <h2 className="title-voucher">Compra finalizada</h2>
          <div className="description-voucher">
            <div>Este é seu voucher:</div>
            <div className="itens-compra">
              <p>{filmeSelect.nome}</p> <p>{sessaoSelect.valor}</p>
            </div>
            {ofertasSelecionadas.map((oferta: Oferta) => {
              return (
                <div className="itens-compra">
                  <p>{oferta.nome}</p> <p>{oferta.valor}</p>
                </div>
              );
            })}
            {descontos.map(desc => {
              return (
                <div className="itens-compra">
                  <p>{desc.nome}</p> <p>{desc.valor}</p>
                </div>
              );
            })}
          </div>
          <div className="container-valor-voucher">
            <p>
              Total{' '}
              <span className="valor">
                R${' '}
                {valorTotal + descontoTotal < 0
                  ? 0
                  : valorTotal + descontoTotal}
              </span>
            </p>
          </div>

          <div className="container-btn">
            <img src={qrcode} alt="" />
            <button onClick={handleCloseModalVoucher}>Concluir</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
