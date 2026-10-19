import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, QueryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";
import { OrderItem, orderItemConverter } from "../models/ordem-item.model.js";

export class OrderRepository {
    private collection: CollectionReference<Order>;

    constructor() {
        this.collection = getFirestore().collection("orders").withConverter(orderConverter);
    };

    async save(order: Order) {
        const batch = getFirestore().batch();

        // Cabecalho do pedido
        const orderRef = this.collection.doc();
        batch.create(orderRef, order);

        // itens do pedido
        const itemsRef = orderRef.collection("items").withConverter(orderItemConverter);
        for (let item of order.items!) {
            batch.create(itemsRef.doc(), item);
        };

        await batch.commit();

        // const orderRef = await this.collection.add(order)
        // console.log(orderRef)
        // for (let item of order.items) {
        //     
        //await orderRef.collection("items").withConverter(orderItemConverter).add(item) // agora os items vao ser salvo em um sub-colecao de order
        // }
    };

    async search(queryParams: QueryParamsOrder): Promise<Order[]> {
        let query: FirebaseFirestore.Query = this.collection;

        if (queryParams.empresaId) {
            query = query.where("empresa.id", "==", queryParams.empresaId);
        };

        if (queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).add(1, "day").startOf("day").toDate();
            query = query.where("data", ">=", queryParams.dataInicio);
        };

        if (queryParams.dataFim) {
            queryParams.dataFim = dayjs(queryParams.dataFim).add(1, "day").endOf("day").toDate();
            query = query.where("data", "<=", queryParams.dataFim);
        };

        if (queryParams.status) {
            query = query.where("status", "==", queryParams.status);
        };

        const spapshot = await query.get();

        return spapshot.docs.map(doc => {
            return new Order({
                id: doc.id,
                ...doc.data()
            } as unknown)
        })
    };

    async getItems(pedidoId: string): Promise<OrderItem[]> {
        const pedidoRef = this.collection.doc(pedidoId);
        const snapshot = await pedidoRef.collection("items").withConverter(orderItemConverter).get();

        return snapshot.docs.map(doc => doc.data());
    };
}