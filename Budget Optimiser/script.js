/* ===========================================================
   SMART BUDGET ALLOCATION SYSTEM
   Premium Version 2.0
   Dynamic Programming - 0/1 Knapsack
=========================================================== */

/* ===========================================
   Add New Item
=========================================== */

function addRow() {

    const tbody = document.querySelector("#itemsTable tbody");

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>

            <input type="text" placeholder="Item Name">

        </td>

        <td>

            <input type="number" placeholder="Cost">

        </td>

        <td>

            <input type="number" placeholder="Benefit">

        </td>

        <td>

            <button
            class="delete-btn"
            onclick="deleteRow(this)">

            <i class="fa-solid fa-trash"></i>

            </button>

        </td>

    `;

    tbody.appendChild(row);

}

/* ===========================================
   Delete Item
=========================================== */

function deleteRow(btn){

    btn.parentElement.parentElement.remove();

}

/* ===========================================
   Read Table Data
=========================================== */

function getItems(){

    const rows = document.querySelectorAll("#itemsTable tbody tr");

    let items=[];

    rows.forEach(row=>{

        const inputs=row.querySelectorAll("input");

        const name=inputs[0].value;

        const cost=parseInt(inputs[1].value);

        const benefit=parseInt(inputs[2].value);

        if(
            name!="" &&
            !isNaN(cost) &&
            !isNaN(benefit)
        ){

            items.push({

                name:name,

                cost:cost,

                value:benefit

            });

        }

    });

    return items;

}

/* ===========================================
   Solve 0/1 Knapsack
=========================================== */

function solveKnapsack(){

    const budget=parseInt(

        document.getElementById("budget").value

    );

    if(isNaN(budget) || budget<=0){

        alert("Enter a valid budget.");

        return;

    }

    const items=getItems();

    if(items.length==0){

        alert("Add at least one item.");

        return;

    }

    const n=items.length;

    let dp=[];

    for(let i=0;i<=n;i++){

        dp[i]=[];

        for(let w=0;w<=budget;w++){

            dp[i][w]=0;

        }

    }

    /* Dynamic Programming */

    for(let i=1;i<=n;i++){

        for(let w=0;w<=budget;w++){

            if(items[i-1].cost<=w){

                dp[i][w]=Math.max(

                    items[i-1].value+

                    dp[i-1][w-items[i-1].cost],

                    dp[i-1][w]

                );

            }

            else{

                dp[i][w]=dp[i-1][w];

            }

        }

    }

    /* Backtracking */

    let w=budget;

    let selected=[];

    let totalCost=0;

    let totalBenefit=dp[n][budget];

    for(let i=n;i>0;i--){

        if(dp[i][w]!=dp[i-1][w]){

            selected.push(items[i-1]);

            totalCost+=items[i-1].cost;

            w-=items[i-1].cost;

        }

    }

    selected.reverse();

    showResult(

        selected,

        totalCost,

        totalBenefit,

        budget

    );

}

/* ===========================================
   Display Result
=========================================== */

function showResult(

selected,

totalCost,

totalBenefit,

budget

){

let html="";

html+=`

<h2 style="color:#38BDF8;">

Optimization Successful

</h2>

<br>

`;

html+=`

<table
style="width:100%;
border-collapse:collapse;">

<tr>

<th align="left">

Selected Item

</th>

<th>

Cost

</th>

<th>

Benefit

</th>

</tr>

`;

selected.forEach(item=>{

html+=`

<tr>

<td>

${item.name}

</td>

<td>

₹${item.cost}

</td>

<td>

${item.value}

</td>

</tr>

`;

});

html+=`</table><br>`;

html+=`

<h3>

Summary

</h3>

`;

html+=`

<p>

<strong>Total Cost :</strong>

₹${totalCost}

</p>

`;

html+=`

<p>

<strong>Total Benefit :</strong>

${totalBenefit}

</p>

`;

html+=`

<p>

<strong>Remaining Budget :</strong>

₹${budget-totalCost}

</p>

`;

document.getElementById(

"result"

).innerHTML=html;

/* Statistics */

document.getElementById(

"selectedItems"

).innerText=

selected.length;

document.getElementById(

"benefitValue"

).innerText=

totalBenefit;

document.getElementById(

"remainingBudget"

).innerText=

"₹"+(budget-totalCost);

let used=Math.round(

(totalCost/budget)*100

);

document.getElementById(

"usedPercentage"

).innerText=

used+"%";

}

/* ===========================================
   Navbar Highlight
=========================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(sec=>{

const top=sec.offsetTop-150;

if(scrollY>=top){

current=sec.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(

link.getAttribute("href")==="#"+current

){

link.classList.add("active");

}

});

});

/* ===========================================
   Reveal Animation
=========================================== */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(

".glass-card,.about-card,.algo-card,.team-card"

).forEach(card=>{

card.classList.add("hidden");

observer.observe(card);

});

/* ===========================================
   Console
=========================================== */

console.log(

"Smart Budget Allocation System Loaded Successfully."

);