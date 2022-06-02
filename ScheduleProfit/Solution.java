import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.TreeMap;
import java.util.Map;
import java.util.Collections;
import java.util.Arrays;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
class Solution {
  public static void main(String[] args) {
    Solution s1 = new Solution();
    Solution s2 = new Solution();
    Solution s3 = new Solution();
    Solution s4 = new Solution();
    Solution s5 = new Solution();

    long runtime;
    int[][] input = getInput();
    // runtime = runTestFunc((int[][] jobs) -> s2.jobScheduling2(jobs[0], jobs[1], jobs[2]), getInput());
    // System.out.println("Runtime is " + runtime);
    // runtime = runTestFunc((int[][] jobs) -> s3.jobScheduling3(jobs[0], jobs[1], jobs[2]), getInput());
    // System.out.println("Runtime is " + runtime);
    runtime = runTestFunc((int[][] jobs) -> s1.jobScheduling(jobs[0], jobs[1], jobs[2]), getInput());
    System.out.println("Runtime is " + runtime);
    // runtime = runTestFunc((int[][] jobs) -> s4.jobScheduling4(jobs[0], jobs[1], jobs[2]), getInput());
    // System.out.println("Runtime is " + runtime);
    runtime = runTestFunc((int[][] jobs) -> s5.jobScheduling5(jobs[0], jobs[1], jobs[2]), getInput());
    System.out.println("Runtime is " + runtime);

  }

  static int[][] getInput() {
    int num = 50;
    int[][] sols = new int[][] { new int[num], new int[num], new int[num] };
    for (int i = 0; i < num; i++) {
      sols[0][i] = (int)( Math.random() * i);
      sols[1][i] = sols[0][i] + (int)( Math.random() * i + 1);
      sols[2][i] = (int)( Math.random() * i);
    }

    return sols;
  }

  static long runTestFunc(Function<int[][], Integer> f, int[][] input) {
    // int[][] sols = getInput();
    long start = System.currentTimeMillis();
    int sol = f.apply(input);
    System.out.println(sol);
    return System.currentTimeMillis() - start;
  }

  static long runTest1(Solution s) {
    int[][] sols = getInput();
    long start = System.currentTimeMillis();
    int sol = s.jobScheduling(sols[0], sols[1], sols[2]);
    System.out.println(sol);
    return System.currentTimeMillis() - start;
  }

  static long runTest2(Solution s) {
    int[][] sols = getInput();
    long start = System.currentTimeMillis();
    int sol = s.jobScheduling2(sols[0], sols[1], sols[2]);
    System.out.println(sol);
    return System.currentTimeMillis() - start;
  }

  static long runTest3(Solution s) {
    int[][] sols = getInput();
    long start = System.currentTimeMillis();
    int sol = s.jobScheduling3(sols[0], sols[1], sols[2]);
    System.out.println(sol);
    return System.currentTimeMillis() - start;
  }

  List<int[]> jobs = new ArrayList<>();
  Map<Integer, Integer> cache = new HashMap<>();

  public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
    for (int i = 0; i < startTime.length; i++) {
      jobs.add(new int[] { startTime[i], endTime[i], profit[i] });
    }
    Collections.sort(jobs, (a, b) -> a[0] - b[0]);
    System.out.println(jobs.stream().map(arr -> new Job(arr[0], arr[1], arr[2])).collect(Collectors.toList()));
    cache.put(jobs.size(), 0);
    int res =  cachedBestFrom(0);
    System.out.println();
    System.out.println(this.cache.entrySet().stream().map(entry -> entry.getKey() * 1000 + entry.getValue() ).sorted().map(val -> val / 1000 + "-" + val % 1000).collect(Collectors.toList()));
    System.out.println(cache);
    return res;
  }

  public int cachedBestFrom(int startIndex) {
    System.out.println(startIndex);
    System.out.println(cache);
    if (cache.containsKey(startIndex)) {
      return cache.get(startIndex);
    }
    if (startIndex >= jobs.size()) {
      cache.put(startIndex, 0);
      return 0;
    }
    int earliestEnd = jobs.get(startIndex)[1];

    // Get list of jobs that start before earliest end time of set of next jobs
    List<int[]> validJobs = new ArrayList<>();
    for (int i = startIndex; i < jobs.size() && jobs.get(i)[0] <= earliestEnd; i++) {
      validJobs.add(jobs.get(i));
      earliestEnd = Math.min(earliestEnd, jobs.get(i)[1]);
    }
    System.out.println(validJobs.stream().map(arr -> new Job(arr[0], arr[1], arr[2])).collect(Collectors.toList()));
    System.out.println();
    // Sort above jobs by end time
    Collections.sort(validJobs, (a, b) -> a[1] - b[1]);
    int nextStartIndex = startIndex + 1;
    int bestProfit = 0;
    for (int i = 0; i < validJobs.size(); i++) {
      int[] currJob = validJobs.get(i);
      // Increment nextStartIndex while it refers to a job that starts
      // after the currently considered one finishes
      while (nextStartIndex < jobs.size() && currJob[1] > jobs.get(nextStartIndex)[0]) {
        nextStartIndex++;
      }
      bestProfit = Math.max(bestProfit, currJob[2] + cachedBestFrom(nextStartIndex));
    }
    cache.put(startIndex, bestProfit);
    return bestProfit;
  }

  // asdf
  class Job implements Comparable<Job> {

    int start;
    int end;
    int profit;

    public Job(int start, int end, int profit) {
      this.start = start;
      this.end = end;
      this.profit = profit;
    }

    public String toString() {
      return this.start + "-" + this.end + " $" + this.profit;
    }

    public int compareTo(Job other) {
      if (this.end != other.end) return this.end - other.end;
      if (this.start != other.start) return this.start - other.start;
      return this.profit - other.profit;
  }
  }

  public int jobScheduling2(int[] startTime, int[] endTime, int[] profit) {

    int len = startTime.length;
    Job[] jobs = new Job[len];
    for (int i = 0; i < len; i++) {
      jobs[i] = new Job(startTime[i], endTime[i], profit[i]);
    }

    Arrays.sort(jobs);

    int[] dp = new int[len];
    dp[0] = jobs[0].profit;

    for (int right = 1; right < len; right++) {
      Job currJob = jobs[right];
      dp[right] = Math.max(dp[right - 1], currJob.profit);

      for (int left = right - 1; left >= 0; left--) {
        Job prevJob = jobs[left];
        if (prevJob.end <= currJob.start) {
          dp[right] = Math.max(dp[right], dp[left] + currJob.profit);
          break;
        }
      }
    }

    return dp[len - 1];
  }

  public int jobScheduling3(int[] startTime, int[] endTime, int[] profit) {
    int n = startTime.length;
    Job[] jobs = new Job[n];
    for (int i = 0; i < n; i++) {
      jobs[i] = new Job(startTime[i], endTime[i], profit[i]);
    }
    Arrays.sort(jobs, (a, b) -> Integer.compare(a.end, b.end));
    int[] dp = new int[n];
    dp[0] = jobs[0].profit;
    for (int i = 1; i < n; i++) {
      int currentProfit = jobs[i].profit;
      int index = -1;
      for (int j = i - 1; j >= 0; j--) {
        if (jobs[j].end <= jobs[i].start) {
          index = j;
          break;
        }
      }
      if (index != -1) {
        currentProfit += dp[index];
      }
      dp[i] = Math.max(currentProfit, dp[i - 1]);
    }
    return dp[n - 1];
  }

  public int jobScheduling4(int[] startTime, int[] endTime, int[] profit) {
    int len = startTime.length;

    // Sort the end time and change the start time and the profit accordingly
    // This is insertion sort
     for (int i = 1; i < len; i++)
     {
        int e = endTime[i], s = startTime[i], p = profit[i], j = i - 1;
        while (j >= 0 && endTime[j] > e)
        {
            endTime[j + 1] = endTime[j];
            startTime[j + 1] = startTime[j];
            profit[j + 1] = profit[j];
            j--;
        }
        endTime[j + 1] = e;
        startTime[j + 1] = s;
        profit[j + 1] = p;
    }

    int[] dp = new int[len];

    dp[0] = profit[0];

    for(int j = 1; j < len; j++)
    {
        int start = startTime[j];

        // In other words, earn is the profit associates with this start time
        int earn = profit[j];

        int prevEnd = endTime[j-1];

        if(start < prevEnd)
        {
            int prev = j - 1;

            // move prev back until we find an end time is less than the current start time
            while(prev >= 0 && endTime[prev] > start) prev--;

            // if there is no such end time
            if(prev < 0)
            {
                // dp[j] = max(profit[j], dp[j-1])
                dp[j] = Math.max(earn, dp[j-1]);
            }
            // if there is such end time where the end time is less than the current start time
            else
            {
                // dp[j] = max(dp[prev] + ear, dp[j-1])
                // profit of that time + profit[j] or the previous profit stored at dp[j - 1]
                dp[j] = Math.max(dp[prev] + earn, dp[j-1]);
            }
        }

        // if start time > previous end time
        else
        {
            // dp[j] = dp[j - 1] + profit[j]
            dp[j] = dp[j-1] + earn;
        }
    }
    return dp[len-1];
}

public int jobScheduling5(int[] startTime, int[] endTime, int[] profit) {
  Job[] jobs = new Job[startTime.length];
  for (int i=0; i<startTime.length; i++) jobs[i] = new Job(startTime[i], endTime[i], profit[i]);
  Arrays.sort(jobs, (j1, j2) -> j1.compareTo(j2));
  TreeMap<Integer, Integer> profitByEndTime = new TreeMap<>(); // store max profit at this end time
  int maxProfit = 0;
  for (Job job : jobs) {
      Integer prevTime = profitByEndTime.lowerKey(job.start+1);
      maxProfit = Math.max(maxProfit, job.profit + (prevTime != null ? profitByEndTime.get(prevTime) : 0));
      profitByEndTime.put(job.end, maxProfit);
  }
  return maxProfit;
}


}