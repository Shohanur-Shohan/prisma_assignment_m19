import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function DELETE(req, res){

    const prisma = new PrismaClient();
    BigInt.prototype.toJSON = function (){
        return this.toString();
    }

    try{
        // const reqBody = await req.json();
        const {searchParams} = new URL(req.url);
        let id = searchParams.get("id");
        await prisma.product.delete({
            where:{id:id}
        })
        return NextResponse.json({status: "success"})
    }catch(err){
        return NextResponse.json({status: "Failed", error: err.toString()})
    }

}