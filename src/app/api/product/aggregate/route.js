import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req, res){
    const prisma = new PrismaClient();
    BigInt.prototype.toJSON = function (){
        return this.toString();
    }
    try{
        const result = prisma.product.aggregate({
            _avg:{price:true},
            _count:{id:true},
            _max:{price:true},
            _sum:{price:true},
            _min:{price:true}
        });

        const result2 = prisma.product.groupBy({
            by:['id']
        });

        const transition = await prisma.$transaction([result, result2])

        return NextResponse.json({status: "success", data: transition});

    }catch(error){
        return NextResponse.json({status: "Failed", error: error.toString()});
    }
}