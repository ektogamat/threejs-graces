// // create parameters for GUI
// var params = {color: sunLight.color.getHex(), color4: fillLight.color.getHex()}

// // create a function to be called by GUI
// const update = function () {
// 	var colorObj = new THREE.Color( params.color )
// 	var colorObj4 = new THREE.Color( params.color4 )
// 	sunLight.color.set(colorObj)
// 	fillLight.color.set(colorObj4)
// }

// //////////////////////////////////////////////////
// //// GUI CONFIG
// gui.add(sunLight, 'intensity').min(0).max(10).step(0.0001).name('Dir intensity')
// gui.add(fillLight, 'intensity').min(0).max(10).step(0.0001).name('Dir intensity')
// gui.add(camera2.position, 'x').min(-10).max(10).step(0.1).name('Dir X pos')
// gui.add(camera2.position, 'y').min(-10).max(10).step(0.1).name('Dir Y pos')
// gui.add(camera2.position, 'z').min(-10).max(10).step(0.1).name('Dir Z pos')
// gui.add(camera2.rotation, 'x').step(0.1).name('Rot X pos')
// gui.add(camera2.rotation, 'y').step(0.1).name('Rot Y pos')
// gui.add(camera2.rotation, 'z').step(0.1).name('Rot Z pos')

// // gui.add(fillLight.position, 'x').min(-100).max(100).step(0.00001).name('Dir X pos')
// // gui.add(fillLight.position, 'y').min(0).max(100).step(0.00001).name('Dir Y pos')
// // gui.add(fillLight.position, 'z').min(-100).max(100).step(0.00001).name('Dir Z pos')

// gui.addColor(params,'color').name('Dir color').onChange(update)
// gui.addColor(params,'color4').name('FillColor color').onChange(update)