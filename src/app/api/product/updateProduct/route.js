import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res){
    const prisma = new PrismaClient();

    BigInt.prototype.toJSON = function (){
        return this.toString();
    }
    try{
        const reqBody = await req.json();
        const {searchParams} = new URL(req.url);
        let id = searchParams.get("id");
        const result = await prisma.product.update(
            {
                where:{id:id},
                data: reqBody
            }           
        );

        return NextResponse.json({status: "success", data: result});

    }catch(error){
        return NextResponse.json({status: "Failed", error: error.toString()});
    }  
}