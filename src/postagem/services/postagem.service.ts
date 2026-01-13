import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem) 
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return this.postagemRepository.find();
    }

    // Find postagem por id
    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        });

        if (!postagem) {
            throw new HttpException('Postagem não encontrada',  HttpStatus.NOT_FOUND);
        }
            return postagem;
    }

    // Find postagens por titulo
    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });
    }

    // Create a nova postagem
    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    // Update a postagem
    async update(postagem: Postagem): Promise<Postagem> {
        await this.findById(postagem.id);
        return await this.postagemRepository.save(postagem);
    }

    // Delete a postagem
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.postagemRepository.delete(id);
    }   

}