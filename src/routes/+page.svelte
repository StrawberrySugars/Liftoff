<script>
    // import writable from 'svelte/store';

    // if (document.readyState == 'loading') {
    //     document.addEventListener('DOMContentLoaded', ready);
    // } else {
    //     ready();
    // }

    ready()

    // // var total = 0;
    // // var priceAdded = 0;
    const myData = ['Apple', 'Banana', 'Cherry'];
    // const listElement = document.getElementById('foodItems');

    // //set up event listeners
    function ready() {
        
    }


</script>





<div class="navBar">
    <ul>
        <li><a id="box" href="\">Foods</a></li>
        <li><a id="box" href="\beverages">Beverages</a></li>
    </ul>
</div>

<h2>Recommended Meal</h2>

<div class="recMeal">
    <h4>It is recommended for you to have:</h4>
    <ul>
        <li>ingredient 1</li>
        <li>ingredient 2</li>
    </ul>
</div>

<h2>Recommended Foods to Grow</h2>

<div class="recGrow">
    <h4>It is recommended for you to have:</h4>
    <ul>
        <li>ingredient 1</li>
        <li>ingredient 2</li>
    </ul>
</div>

<h2>List of Foods</h2>

<div class="addFood">
    <p>+  add a food</p>
</div>

<div>
    <ul id="foodItems">
        <li>nuts      amount left: 100g</li>
    </ul>
</div>