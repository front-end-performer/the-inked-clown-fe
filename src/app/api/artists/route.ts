export async function updateArtistApi(id: string, formData: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_NODE_URL}/artist/update?id=${id}`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .catch((err: any) => {
      console.log("update error", err);
    });

  return response;
}

export async function createNewArtistApi(userId: string, formData: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_NODE_URL}/artist/create?userId=${userId}`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .catch((err: any) => {
      console.log("update error", err);
    });

  return response;
}

export async function deleteArtistApi(artistId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_NODE_URL}/artist/delete?artistId=${artistId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  )
    .then((resp) => resp.json())
    .catch((err: any) => {
      console.log("update error", err);
    });

  return response;
}
