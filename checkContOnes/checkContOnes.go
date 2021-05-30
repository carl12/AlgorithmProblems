
package main

import "fmt"

func checkOnesSegment(s string) bool {
	var streak = 0
	var count = 0
    for _, c := range s {
		if c == '1' {
			streak ++;
		} else {
			streak = 0
		}
		if streak == 1 {
			count ++
		}
	}
	return count == 1
}

func main() {
	fmt.Println(checkOnesSegment("11110"))
}