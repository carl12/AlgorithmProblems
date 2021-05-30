import java.util.List;
import java.util.ArrayList;
import java.util.stream.IntStream;
import java.util.stream.Collectors;

class Nearest {
    public static void main(String[] args) {
      reinitializePermutation(0);
    }
    public static int reinitializePermutation(int n) {

      for (int i = 2; i < 100; i+=2) {
          System.out.println(doThing(i));
      }
      return 0;
  }

  public static int doThing(int n) {
      List<Integer> orig = IntStream.range(0, n).boxed().collect(Collectors.toList());
      List<Integer> list = orig.stream().collect(Collectors.toList());
      makePermutation(list);
      int i = 1;
      while (!list.equals(orig)) {
          makePermutation(list);
          i++;
      }
      return i;
  }

  public static List<Integer> makePermutation(List<Integer> perm) {
      List<Integer> arr = new ArrayList(perm);
      for (int i = 0; i < perm.size(); i+=2) {
          arr.set(i, perm.get(i / 2));
      }
      for (int i = 1; i < perm.size(); i += 2) {
           arr.set(i, perm.get(perm.size() / 2 + (i - 1)/2));

      }
      perm.clear();
      perm.addAll(arr);
      // System.out.println(arr);
      return arr;
  }
}