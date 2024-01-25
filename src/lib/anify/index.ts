"use server";
import { NextResponse } from "next/server";
export async function getAnifyEpisodes(id: number) {
  try {
    const response = await fetch(`https://api.anify.tv/episodes/${id}`, {
      next: {
        revalidate: 86400,
      },
    });
    const data = await response.json();
    return {
      data,
      error: false,
    };
  } catch (error) {
    return {
      error: "Server Error",
    };
  }
}

export const getAnifyMetadata = async (id: number) => {
  try {
    const resp = await fetch(`https://api.anify.tv/content-metadata/${id}`, {
      next: {
        revalidate: 3600,
      },
    });
    const data = await resp.json();
    if (!data || data.length === 0) {
      return {
        data: data,
        error: true,
      };
    }
    const metadata = data;
    const defaultPr = metadata.find((e: any) => e.providerId === "tmdb");
    const provider =
      defaultPr !== null && defaultPr !== undefined ? defaultPr : metadata[0];
    provider.data = provider.data.map((item: any) => {
      return { data: { ...item, providers: [] }, error: false };
    });

    return provider;
  } catch (e) {
    console.log("Erorr metadata: " + e);
    return {
      data: [],
      error: true,
    };
  }
};
