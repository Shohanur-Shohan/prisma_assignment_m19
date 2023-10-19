import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function DELETE(req, res){
    
    
    try{
        const prisma = new PrismaClient();
        BigInt.prototype.toJSON = function (){
            return this.toString();
        }
        const {searchParams} = new URL(req.url);
        let id = searchParams.get("id");
        await prisma.user.delete(
            {
                where:{id:id}
            }
           
        );

        return NextResponse.json({status: "success"});

    }catch(error){
        return NextResponse.json({status: "Failed", error: error.toString()});
    }
}
