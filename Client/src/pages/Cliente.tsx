import React, { useContext, useEffect, useState } from "react";
import Hooks from "../hooks";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Input,
    Table,
    Form,
    FormGroup,
    Container,
    Label,
} from "reactstrap";

function Cliente() {
    const { createCliente, listCliente, removeCliente, updateCliente } =
        Hooks();
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [clientes, setClientes] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalDataValores, setModalDataValores] = useState({
        cpf: "",
        nome: "",
        telefone: "",
        endereco: "",
    });

    useEffect(() => {
        retrieveClientes();
    }, [offset]);

    const retrieveClientes = async () => {
        const data = await listCliente(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }
        setClientes(data);
    };

    const handle = async (e: any) => {
        e.preventDefault();

        await createCliente(cpf, nome, telefone, endereco);
        retrieveClientes();
    };

    const limpar = () => {
        setNome("");
        setTelefone("");
        setCpf("");
        setEndereco("");
    };

    const remover = async (e: any, cpf: string) => {
        e.preventDefault();
        await removeCliente(cpf);
        retrieveClientes();
    };

    const editar = async (e: any) => {
        const { cpf, nome, telefone, endereco } = modalDataValores;
        e.preventDefault();
        await updateCliente(cpf, nome, telefone, endereco);
        retrieveClientes();
        desativarModal(e);
    };

    const ativarModal = async (
        e: any,
        cpf: string,
        nome: string,
        telefone: string,
        endereco: string
    ) => {
        e.preventDefault();
        setModalDataValores({
            cpf: cpf,
            nome: nome,
            telefone: telefone,
            endereco: endereco,
        });
        setShowModal(true);
    };

    const desativarModal = (e: any) => {
        e.preventDefault();
        setShowModal(false);
        setModalDataValores({
            cpf: "",
            nome: "",
            telefone: "",
            endereco: "",
        });
    };

    const anterior = (e: any) => {
        e.preventDefault();
        const newOffset = Math.max(offset - limit, 0);
        setOffset(newOffset);
    };

    const proximo = (e: any) => {
        e.preventDefault();
        const newOffset = offset + limit;
        setOffset(newOffset);
    };

    return (
        <div>
            <Modal isOpen={showModal}>
                <ModalHeader>Editar Cliente</ModalHeader>
                <ModalBody>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        value={modalDataValores.nome}
                        onChange={(e) =>
                            setModalDataValores({
                                nome: e.target.value,
                                cpf: modalDataValores.cpf,
                                telefone: modalDataValores.telefone,
                                endereco: modalDataValores.endereco,
                            })
                        }
                    ></Input>
                    <Label>Telefone</Label>
                    <Input
                        type="text"
                        value={modalDataValores.telefone}
                        onChange={(e) =>
                            setModalDataValores({
                                telefone: e.target.value,
                                cpf: modalDataValores.cpf,
                                nome: modalDataValores.nome,
                                endereco: modalDataValores.endereco,
                            })
                        }
                    ></Input>
                    <Label>Endereço</Label>
                    <Input
                        type="text"
                        value={modalDataValores.endereco}
                        onChange={(e) =>
                            setModalDataValores({
                                endereco: e.target.value,
                                cpf: modalDataValores.cpf,
                                nome: modalDataValores.nome,
                                telefone: modalDataValores.telefone,
                            })
                        }
                    ></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => editar(e)}>
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            <h4 className="mt-3 mb-3">Cliente</h4>
            <Form>
                <FormGroup>
                    <Label>CPF</Label>
                    <Input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Telefone</Label>
                    <Input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Endereço</Label>
                    <Input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Container>
                        <div className="row">
                            <Button
                                className="col col-auto"
                                onClick={(e) => handle(e)}
                            >
                                Criar
                            </Button>

                            <div className="col col-auto" />
                            <Button
                                className="col col-auto"
                                onClick={() => limpar()}
                            >
                                Limpar
                            </Button>
                        </div>
                    </Container>
                </FormGroup>
            </Form>
            <Table striped className="border border-1 table-hover">
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes !== undefined &&
                        clientes.map((item: any, index: number) => (
                            <tr>
                                <td>{item.cpf}</td>
                                <td>{item.nome}</td>
                                <td>{item.telefone}</td>
                                <td>{item.endereco}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        onClick={(e) =>
                                            ativarModal(
                                                e,
                                                item.cpf,
                                                item.nome,
                                                item.telefone,
                                                item.endereco
                                            )
                                        }
                                    >
                                        Editar
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        size="sm"
                                        onClick={(e) => remover(e, item.cpf)}
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <FormGroup>
                <Container>
                    <div className="row">
                        <Button
                            className="col col-auto"
                            size="sm"
                            onClick={(e) => anterior(e)}
                        >
                            Anterior
                        </Button>
                        <div className="col col-auto" />
                        <Button
                            className="col col-auto"
                            size="sm"
                            onClick={(e) => proximo(e)}
                        >
                            Próximo
                        </Button>
                    </div>
                </Container>
            </FormGroup>
        </div>
    );
}

export default Cliente;
