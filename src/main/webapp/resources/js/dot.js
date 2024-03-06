class Dot {
    constructor(first, second, ins) {
        console.log(first,second, ins);
        this.x = parseFloat(first);
        this.y = parseFloat(second);
        this.inside = ins === "true";
    }
}