/* ==========================================
   0/1 KNAPSACK OPTIMIZATION
========================================== */

export const optimizeBudget = async (req, res) => {

    try {

        const { budget, items } = req.body;

        if (!budget || !items || !Array.isArray(items)) {

            return res.status(400).json({

                success: false,

                message: "Invalid input."

            });

        }

        const n = items.length;

        const dp = Array.from(

            { length: n + 1 },

            () => Array(budget + 1).fill(0)

        );

        /* ==========================
           BUILD DP TABLE
        =========================== */

        for (let i = 1; i <= n; i++) {

            for (let w = 0; w <= budget; w++) {

                if (items[i - 1].cost <= w) {

                    dp[i][w] = Math.max(

                        items[i - 1].benefit +

                        dp[i - 1][w - items[i - 1].cost],

                        dp[i - 1][w]

                    );

                }

                else {

                    dp[i][w] = dp[i - 1][w];

                }

            }

        }

        /* ==========================
           FIND SELECTED ITEMS
        =========================== */

        let w = budget;

        const selectedItems = [];

        let totalCost = 0;

        for (let i = n; i > 0; i--) {

            if (dp[i][w] !== dp[i - 1][w]) {

                selectedItems.push(items[i - 1]);

                totalCost += items[i - 1].cost;

                w -= items[i - 1].cost;

            }

        }

        selectedItems.reverse();

        res.json({

            success: true,

            budget,

            totalBenefit: dp[n][budget],

            totalCost,

            remainingBudget: budget - totalCost,

            selectedItems

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};