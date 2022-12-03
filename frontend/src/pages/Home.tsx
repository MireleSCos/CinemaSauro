import { useEffect, useState } from 'react';
import { FormEvent } from 'react';

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
  const handleCloseModalVoucher = () => setOpenModalVoucher(false);

  const [filmes, setFilmes] = useState<any[]>([]);
  const [sessoes, setSessoes] = useState<any[]>([]);
  const [ofertas, setOfertas] = useState<any[]>([]);

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
  });
  const [ofertasSelecionadas, setOfertasSelecionadas] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  useEffect(() => {
    getFilmes();
  }, [selectedIndex]);
  useEffect(() => {
    getSessoes();
  }, [filmeSelect]);
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
    handleListItemClick(6);
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
      .get('sessao/' + idFilmeSelecionado)
      .then(response => {
        setSessoes(response.data);
      })
      .catch(() => {
        alert('Erro ao listar sessoes.');
      });
  };

  const getOfertas = () => {
    /* alert('Erro ao listar profissionais.'); */
    let toferta = {
      id_oferta: '123',
      name: 'Pipoca',
      valor: '50,00',
    };
    let toferta2 = {
      id_oferta: '1234',
      name: 'Coca-cola',
      valor: '10,00',
    };
    let toferta3 = {
      id_oferta: '222',
      name: 'Fini',
      valor: '10,00',
    };
    setOfertas([toferta, toferta2, toferta3]);
  };

  function handleCreateClienteCompra(e: FormEvent) {
    e.preventDefault();

    api
      .post('professionals', {})
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        handleCloseModalCliente();
        handleOpenModalVoucher();
      })
      .catch(() => {
        alert('Erro no cadastro, tente novamente!');
        handleCloseModalCliente();
        handleOpenModalVoucher();
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

        {selectedIndex === 3 && <FormFilme />}
        {selectedIndex === 4 && <FormSessao />}
        {selectedIndex === 5 &&
          (sessoes.length === 0 ? (
            <p className="no-profissional">Nenhuma sessao cadastrado.</p>
          ) : (
            <>
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
                return <CardsOferta oferta={oferta} key={oferta.id_oferta} />;
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
            <input type="text" id="Name" />
            <label htmlFor="Pagamento">Forma de Pagamento</label>
            <select id="Pagamento">
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
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
              <p>Item 1</p> <p>valor</p>
            </div>
            <div className="itens-compra">
              <p>Item 2</p> <p>valor</p>
            </div>
            <div className="itens-compra">
              <p>Item 3</p> <p>valor</p>
            </div>
            <div className="itens-compra">
              <p>Item 4</p> <p>valor</p>
            </div>
          </div>
          <div className="container-valor-voucher">
            <p>
              Total <span className="valor">R$ 20,20</span>
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
