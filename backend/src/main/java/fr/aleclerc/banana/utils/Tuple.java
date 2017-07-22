package fr.aleclerc.banana.utils;

public class Tuple<T, V> {

	private T a;
	private V b;

	private Tuple(T a, V b) {
		this.a = a;
		this.b = b;
	}

	public static <T, V> Tuple<T, V> tuple(T a, V b) {
		return new Tuple<>(a, b);
	}

	public T getA() {
		return a;
	}

	public V getB() {
		return b;
	}

}
