type Profile = {
    flavours: string[]; // Blueberry, Strawberry, Peach, Honey
    readonly acidity: 1 | 2 | 3 | 4 | 5;
    readonly body: 1 | 2 | 3 | 4 | 5;
    readonly sweetness: 1 | 2 | 3 | 4 | 5;
};

export type SpecialtyCoffee = {
    readonly title: string; // ESAYAS BERISO – BOKU
    readonly category: string; // Lavato
    readonly origin: string; // Ethiopia
    readonly altitude: number; // 2350 mt
    readonly variety: string[]; // Catimor, Caturra, Pacamara, 74158
    readonly bean: string; // Arabica
    price: number; // 23€/kg
    readonly image: string; // url to image
    profile: Profile; // {flavours: ["Blueberry", "Strawberry"], acidity: 4, body: 5, sweetness: 2}
};