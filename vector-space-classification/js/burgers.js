function createBurger(meat, vegetables, bakedColor, htmlElement) {
  return {
    meat:meat,
    vegetables:vegetables,
    bakedColor:bakedColor,
    element:htmlElement
  }
}

/*
 **********************************************************************************************
 */

function createBurgerComparator_withReference(meat, vegetables, bakedColor) {
  var referenceMeat = meat;
  var referenceVegetables = vegetables;
  var referenceBakedColor = bakedColor;
  var referenceEuclideanLength = Math.sqrt(meat * meat + vegetables * vegetables + bakedColor * bakedColor);

  return function (burgerOne, burgerTwo) {
    if (burgerOne === burgerTwo) return 0;

    // euclidean lengths
    var o1_el = Math.sqrt(burgerOne.meat * burgerOne.meat + burgerOne.vegetables * burgerOne.vegetables + burgerOne.bakedColor * burgerOne.bakedColor);
    var o2_el = Math.sqrt(burgerTwo.meat * burgerTwo.meat + burgerTwo.vegetables * burgerTwo.vegetables + burgerTwo.bakedColor * burgerTwo.bakedColor);

    // vector dot products
    var dp_1 = (referenceMeat * burgerOne.meat + referenceVegetables * burgerOne.vegetables + referenceBakedColor * burgerOne.bakedColor);
    var dp_2 = (referenceMeat * burgerTwo.meat + referenceVegetables * burgerTwo.vegetables + referenceBakedColor * burgerTwo.bakedColor);

    // similarities from o1 to ReferenceVector and o2 to ReferenceVector
    var similarity1 = dp_1 / (referenceEuclideanLength * o1_el);
    var similarity2 = dp_2 / (referenceEuclideanLength * o2_el);

    // follow the array.sort contract ...
    if (similarity1 == similarity2) return 0;
    if (similarity1 < similarity2) return 1;
    if (similarity1 > similarity2) return -1;
  }
}