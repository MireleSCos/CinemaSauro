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

  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  useEffect(() => {
    api
      .get('filmes')
      .then(response => {
        setFilmes(response.data);
      })
      .catch(() => {
        /* alert('Erro ao listar profissionais.'); */
        let tfilme1 = {
          id_filme: 22,
          nome: 'Nome do Filme',
          is_nacional: true,
          atores_principais: 'Atores principais',
          censura: 22,
          categoria: 'Drama',
          is_estreia: true,
          duracao: 22,
          empresa: 'Pixar',
        };
        let tfilme2 = {
          id_filme: 44,
          nome: 'Nome do Filme',
          is_nacional: true,
          atores_principais: 'Atores principais',
          censura: 22,
          categoria: 'Drama',
          is_estreia: true,
          duracao: 22,
          empresa: 'Pixar',
        };
        setFilmes([tfilme1, tfilme2]);

        /* alert('Erro ao listar profissionais.'); */
        let tsessao = {
          id_sessao: 22,
          sala: 'Sala 101',
          filme: 'Nome do Filme',
          atoresPrincipais: 'Atores principais',
          dataInicio: '22/11/1111',
          horario: '12:30',
        };
        setSessoes([tsessao]);
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
      });
  }, []);
  //Selecionar opção do header
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const opComprarFilmeListSessions = (id_filme: number) => {
    console.log('id do filme:', id_filme);
    handleListItemClick(5);
  };
  const opComprarSessaoListOfertas = (id_sessao: number) => {
    console.log('id da sessao:', id_sessao);
    handleListItemClick(6);
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
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(1);
          }}
        >
          Estreias
        </button>
        <button
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(1);
          }}
        >
          Filmes
        </button>
        <button
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(3);
          }}
        >
          Cadastrar Filme
        </button>
        <button
          className="button-create-profissional"
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
            <p className="no-profissional">Nenhum filme cadastrado.</p>
          ) : (
            <>
              {filmes.map((filme: Filme) => {
                return (
                  <CardsFilmes
                    filme={filme}
                    fcompra={opComprarFilmeListSessions}
                    key={filme.id_filme}
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
                    fcompra={opComprarSessaoListOfertas}
                    key={sessao.id_sessao}
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
        <Footer valorTotal={30.3} fcomprar={handleOpenModalCliente} />
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
