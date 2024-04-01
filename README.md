<div align="center">
  <h1>:mortar_board: Tech Educators' SWD Bootcamp :mortar_board:<br/>:mortar_board: Week 02 Assessment :mortar_board:</h1>
  <p>
    <a href="http://www.LinkedIn.com/in/kevin-barr1988">LinkedIn</a> |
    <a href="http://kjb88.github.io">Website</a> |
    <a href="mailto:kevinbarr.business@gmail.com">Email</a> |
    <a href="https://github.com/KJB88">Github</a>
  </p>
<p>
  Repository for coursework for TechEd Software Development Bootcamp - Week 02.
</p>
</div>
<section>
<h2>Project Outline</h2>
<p>
  
Recreate the famous Cookie Clicker game. The theme can be custom, but it must have persistence of user data (using local storage), increment both actively and passively (via input and intervals). It can optionally have upgrades and items.
</p>
  <b>All requirements and stretch goals were achieved. No specific difficulties.</b>
</section>
<section>
  <h2>Requirements</h2>
  <ul>
    <li><b>Persistent Sugar Level</b>: Save/Load user data from local storage - <b>COMPLETE</b></li>
    <li><b>Make 'em Chewy</b>: Gain cookies passively - <b>COMPLETE</b></li>
    <li><b>Make 'em Crispy</b>: Gain cookies by actively interacting with the webpage (ideally via clicking on a button) - <b>COMPLETE</b></li>
  </ul>
</section>
<section>
  <h2>Stretch Goals</h2>
  <ul>
    <li><b>Customer's Choice</b>: Have different upgrades available for purchase that modify cookies per second or cookies per click - <b>COMPLETE</b></li>
    <li><b>Rainbow Sprinkles</b>: Add additional styles to the webpage to make it look fancy - <b>COMPLETE</b></li>
    <li><b>Automated Bakery</b>: Add new upgrades that have a prerequisite on other upgrades (eg: you need a grandma for every oven, or you can't buy more ovens) - <b>COMPLETE</b></li>
  </ul>
</section>
<section>
  <h2>Implementation (of Requirements)</h2>
  <ul>
    <li><b>Rest that CTRL+S Finger</b>: Local Storage is pulled from on load to populate the player object. If playerdata is undefined, it is populated with defaults values. Additionally, if any invalid values are found, they are individually replaced with a default value. The local storage is updated with the most recent values in an adjustable period of time (from within code) via autosave. It can also be manually saved via the Save Data button. The local storage and current player state can also be cleared via the Reset Data button.</li>
  <li><b>Welfare Chocolate</b>: Kitties are gained passively by a rate of 1 per sec initially. Items and upgrades can increase the KPS (kitties per sec). This is achieved simply through setInterval.</li>
  <li><b>Mandated Petting</b>: Kitties are gained actively at a rate of 1 per click initially. Items and upgrades can increase the KPC (kitties per click). This is achieved simply through onClick listeners.</li>
  </ul>
  </section>
<section>
  <h2>Implementation (of Stretch Goals)</h2>
  <ul>
    <li><b>Capitalism, baby!</b>: Items change the rate of gain of passive kitties and active kitties, but they cost a portion of the kitty count.</li>
    <li><b>Petting, but with Style</b>: My website is literally pink and full of cats. What more do you need?! The main clickable cat has animations, img switching and particle effects. The page layout uses a Grid layout to align at a high-level, then flex boxes to align elements at small-scale. I use drop-shadows uniformly across text to produce very readable text. I have added transparency to high-level grid elements to expose the background while still defining the overall shape of the grid elements. A border on these grid items helps to encapsulate the inner area cleanly.</li>
    <li><b>Sketchy Catnip Dealer</b>: Upgrades are basically Items that have a prerequisite of having an equivalent Item already purchased. For example, you cannot buy a tenth Catnip without having a tenth Kitten.</li>
  </ul>
</section>
<section>
  <h2>Honorary Mentions</h2>
  <ul>
    <li><b>Happy Vibrations</b>: The happy kitty creates love hearts when you click him! They have random direction, sizing, and a bunch of other attributes.</li>
    <li><b>RNG: The Risky Name Generator</b>: A randomised new name for the player is generated every new user data (so first time, on data clear, on invalid name, etc) from two separate lists; adjectives and nouns. Which create a name following the structure of "ADJECTIVE NOUN". </li>
    <li><b>Fluffy Library</b>: I encapsulated common behaviour and data used by both Items and Upgrades into a separate storeCommon.js to be used by both.</li>
    <li><b>Super Caticality</b>: For every Item you buy, a new kitty shows up in your sandbox!</li>
  </ul>
</section>
