export async function createNewPhotoApi(userId: string, formData: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_NODE_URL}/photo/create?userId=${userId}`,
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

export async function deletePhotoApi(photoId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_NODE_URL}/photo/delete?photoId=${photoId}`,
    {
      method: "POST",
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
