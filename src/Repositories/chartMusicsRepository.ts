import { ChartMusics } from "@prisma/client";
import prisma from "../prismaClient";
import BaseRepository from "./BaseRepository/baseRepository";

export class chartMusicsRepository extends BaseRepository<ChartMusics>{
    constructor(){
        super(prisma.chartMusics);
    }

    
}

export default chartMusicsRepository;