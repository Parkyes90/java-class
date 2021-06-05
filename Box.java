abstract class Shape {
    public double height, width;

    public Shape(double h, double w) {
        height = h;
        width = w;
    }

    public void setHeight(double h) {
        height = h;
    }

    public void setWidth(double h) {
        width = w;
    }

    public double getHeight() {
        return height
    }

    public double getWwidth() {
        return width;
    }

    public abstract double getArea();
}

class Triangle extends Shape {
    public Triangle(double h, double w) {
        super(h, w);
    }
    
    @java.lang.Override
    public double getArea() {
        return height * width * 0.5;
    }
}

class Box extends Shape {
    public Box(double h, double w) {
        super(h, w);
    }

    @java.lang.Override
    public double getArea() {
        return height * width;
    }
}