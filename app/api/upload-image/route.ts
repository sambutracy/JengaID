import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = process.env.PINATA_JWT;

    if (!token) {
      return NextResponse.json(
        { error: "PINATA_JWT is not configured." },
        { status: 500 }
      );
    }

    const incomingFormData = await req.formData();
    const file = incomingFormData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const pinataFormData = new FormData();
    const fileBuffer = await file.arrayBuffer();
    pinataFormData.append(
      "file",
      new Blob([fileBuffer], { type: file.type }),
      file.name
    );
    pinataFormData.append("pinataMetadata", JSON.stringify({ name: file.name }));
    pinataFormData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    const pinataResponse = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: pinataFormData,
      }
    );

    const responseData = await pinataResponse.json();

    if (!pinataResponse.ok || responseData.error) {
      return NextResponse.json(
        { error: responseData.error || "Failed to upload file to Pinata." },
        { status: 500 }
      );
    }

    const fileUrl = `https://gateway.pinata.cloud/ipfs/${responseData.IpfsHash}`;

    return NextResponse.json({ fileUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
