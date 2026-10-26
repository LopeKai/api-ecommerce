
export class UploadFileService {
    constructor(private path: string = "") {};

    async upload(base64: string): Promise<string> {
        // TODO: enquanto não tenho o Storage do Firebase, retorno uma URL fake
        // montada a partir da string recebida + ".png"
        return `${this.path}${base64}.png`;

        // const fileBuffer = Buffer.from(base64, "base64");

        // const fileType = await fileTypeFromBuffer(fileBuffer);

        // if(!fileType) {
        //     throw new ValidationError("A extensao do arquivo nao é válida!")
        // }

        // if(fileType.mime !== "image/jpeg" && fileType.mime !== "image/png") {
        //     throw new ValidationError("A imagem precisa ser PNG ou JPEG!")
        // }

        // const fileName = `${randomUUID().toString()}.${fileType?.ext}`;

        // fs.writeFileSync(fileName, fileBuffer); // armazendo a imagem no disco

        // const bucket = getStorage().bucket("aqui-vai-ter-minha-url-storageFirabase");
        // const uploadResponse = await bucket.upload(fileName, {
        //     destination: this.path + fileName
        // });

        // fs.unlinkSync(fileName);

        // return getDownloadURL(uploadResponse[0]);
    };
}
