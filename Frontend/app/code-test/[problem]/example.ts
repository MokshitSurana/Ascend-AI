/* eslint-disable */
const rTabs = (str: string) => str.trim().replace(/^ {4}/gm, "");

const twoSum = {
    javascript: rTabs(`
    class Solution {
    twoSum(nums, target) {
        // Start your code from here
        // Write your solution to the Two Sum problem
    }
}

// Driver code
if (require.main === module) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the number of test cases: ', (t) => {
        for (let i = 0; i < t; i++) {
            rl.question('Enter the array (space-separated numbers): ', (input) => {
                const nums = input.split(' ').map(Number);
                rl.question('Enter the target sum: ', (target) => {
                    const ob = new Solution();
                    const result = ob.twoSum(nums, target);
                    console.log(result.join(' '));
                    rl.close();
                });
            });
        }
    });
}
 
  `),
    python: rTabs(`
    class Solution:
    def twoSum(self, nums, target):
        # Start your code from here
        # Write your solution to the Two Sum problem
        
    # Driver code
    if __name__ == '__main__':
        t = int(input())
        for _ in range(t):
            nums = list(map(int, input().split()))
            target = int(input())
            ob = Solution()
            result = ob.twoSum(nums, target)
            print(result)

  `),
    "c++": rTabs(`
  #include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Start your code from here
        // Write your solution to the Two Sum problem
    }
};

// Driver code
int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> nums(n);
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
        }
        int target;
        cin >> target;
        Solution ob;
        vector<int> result = ob.twoSum(nums, target);
        for (int i = 0; i < result.size(); i++) {
            cout << result[i] << " ";
        }
        cout << endl;
    }
    return 0;
}
  `),
    java: rTabs(`
  import java.util.Scanner;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Start your code from here
        // Write your solution to the Two Sum problem
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = sc.nextInt();
            }
            int target = sc.nextInt();
            Solution ob = new Solution();
            int[] result = ob.twoSum(nums, target);
            for (int i = 0; i < result.length; i++) {
                System.out.print(result[i] + " ");
            }
            System.out.println();
        }
    }
}`),
};

const twoSumProblem = {
    title: "Two Sum",
    difficulty: "Easy",
    description:
        "Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
        {
            input: { nums: [2, 7, 11, 15], target: 9 },
            output: [0, 1],
        },
        {
            input: { nums: [3, 2, 4], target: 6 },
            output: [1, 2],
        },
        {
            input: { nums: [3, 3], target: 6 },
            output: [0, 1],
        },
    ],
    constraints: [
        "Each input would have exactly one solution.",
        "You may not use the same element twice.",
    ],
};

const mergeTwoSortedLists = {
    javascript: rTabs(`
    class ListNode {
        constructor(val = 0, next = null) {
            this.val = val;
            this.next = next;
        }
    }

    class Solution {
        mergeTwoLists(l1, l2) {
            // Start your code from here
            // Write your solution to the Merge Two Sorted Lists problem
        }
    }

    // Driver code
    if (require.main === module) {
        // Create test cases and call the mergeTwoLists function
        // Print the result
    }
  `),
    python: rTabs(`
    # Definition for singly-linked list.
    class ListNode:
        def __init__(self, val=0, next=None):
            self.val = val
            self.next = next

    class Solution:
        def mergeTwoLists(self, l1, l2):
            # Start your code from here
            # Write your solution to the Merge Two Sorted Lists problem

    # Driver code
    if __name__ == "__main__":
        # Create test cases and call the mergeTwoLists function
        # Print the result
  `),
    "c++": rTabs(`
    #include <bits/stdc++.h>
    using namespace std;

    // Definition for singly-linked list.
    struct ListNode {
        int val;
        ListNode* next;
        ListNode(int x) : val(x), next(NULL) {}
    };

    class Solution {
    public:
        ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
            // Start your code from here
            // Write your solution to the Merge Two Sorted Lists problem
        }
    };

    // Driver code
    int main() {
        // Create test cases and call the mergeTwoLists function
        // Print the result
        return 0;
    }
  `),
    java: rTabs(`
    class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }

    class Solution {
        public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
            // Start your code from here
            // Write your solution to the Merge Two Sorted Lists problem
        }

        public static void main(String[] args) {
            // Create test cases and call the mergeTwoLists function
            // Print the result
        }
    }
`),
};

const mergeTwoSortedListsProblem = {
    title: "Merge Two Sorted Lists",
    difficulty: "Medium",
    description:
        "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    constraints: [
        "[0, 50]",
        "[-100, 100]",
        "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    examples: [
        {
            input: "list1 = [1,2,4], list2 = [1,3,4]",
            output: "[1,1,2,3,4,4]",
        },
        {
            input: "list1 = [], list2 = []",
            output: "[]",
        },
        {
            input: "list1 = [], list2 = [0]",
            output: "[0]",
        },
    ],
};

export {
    twoSum,
    twoSumProblem,
    mergeTwoSortedListsProblem,
    mergeTwoSortedLists,
};
