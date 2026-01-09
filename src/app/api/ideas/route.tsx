import suitApi from "@/src/lib/axios-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const pageNumber = searchParams.get("pageNumber") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "10";
    const sort = searchParams.get("sort") ?? "-published_at";

    const sanitizedPage = Math.max(Number(pageNumber), 1); // minimal page 1
    const sanitizedSize = Math.min(Math.max(Number(pageSize), 10), 50);

    const sanitizedSort =
      sort === "published_at" ? "published_at" : "-published_at";
    console.log("paginations", { sanitizedPage, sanitizedSize, sanitizedSort });

    const response = await suitApi.get("/ideas", {
      params: {
        "page[number]": sanitizedPage,
        "page[size]": sanitizedSize,
        sort: sanitizedSort,
        "append[]": ["small_image", "medium_image"],
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: response.data,
        message: "Ideas fetched successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        response: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}
