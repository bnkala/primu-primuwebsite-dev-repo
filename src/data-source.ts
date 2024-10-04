import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Gam3lihle96!",
    database: "primu_land_page_db",
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*.js"],
    synchronize: false,
});