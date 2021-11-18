import Sequelize from "sequelize";
import Database from "../database";

const revisao: any = Database.define(
    "revisao",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        data: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        cpf_cliente: {
            type: Sequelize.STRING,
            allowNull: false,
            refenreces: {
                model: "cliente",
                key: "cpf",
            },
        },
        placa_veiculo: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "veiculo",
                key: "numeroPlaca",
            },
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        relatorio: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

export default revisao;