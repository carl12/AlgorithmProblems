class AbitraryClass {
  static int counter = 0;
  static AtomicInt c2 = 0;
  public static void main(String[] args) {

  }

  public void doSomething() {
    if (counter >= 1000) {
      c.lock();
      if (counter >= 1000) {
        counter = 1;
        c.unlock();
        System.stackTrace();
      } else {
        c.unlock();
      }
    }
    counter ++;

    // Do some work
  }

  public void doSomething2() {
    if (c2.incrementAndGet() == 1000) {
      cs.set(0);
      System.stackTrace();
    }
    
  }
}