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
        error: false
    }
  } catch (error) {
    return {
      error: "Server Error",
    };
  }
}
