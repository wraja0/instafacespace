const btn1 = $('.btn1');
const btn2 = $('.btn2');
const newFaceDiv = $('.newface')
const newSpaceDiv = $('.newspace')
const newSpacePage = $('.newspacepage')
const newFacePage = $('.newfacepage')
const btnClick1 = ()=> {
    newSpaceDiv.hide(400);
    newFaceDiv.hide(400);
    newFacePage.show(400)
}
const btnClick2 = ()=> {
    newSpaceDiv.hide(400);
    newFaceDiv.hide(400);
    newSpacePage.show(400);
}
btn1.on("click", btnClick1);
btn2.on("click", btnClick2);
newSpacePage.hide();
newFacePage.hide();
