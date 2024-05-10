
var unfinishTasklist = new Array()
var finishTasklist = new Array()
var checkCount = 0

document.addEventListener('DOMContentLoaded', function () {
    getToday()

})// done content loaded


//press enter to add task
function addTask(e) {
    if (e.keyCode == 13) {
        addTodo();
    }
}

//when press "ADD TASK" botton
function addTodo() {

    //get the input value
    var add_task = document.querySelector('.todo_input').value
    document.querySelector('.todo_input').value = ''
    unfinishTasklist.push(add_task)

    //can not add more than 10 unfinished tasks 
    if (unfinishTasklist.length > 10) {
        alert('You have too many tasks now! Just complete some tasks first.')
        unfinishTasklist.pop()
    }
    else {
        //console.log(unfinishTasklist)
        //create new li object
        var new_task = document.createElement('li')
        new_task.classList.add('unFinishTask')
        new_task.innerHTML = add_task

        //add the new object to html structure
        document.querySelector('.unfinish').append(new_task)

        //create note
        var new_post = document.createElement('div')

        var postColor = Math.floor(Math.random() * 3)
        if (postColor == '0') {
            new_post.style.backgroundColor = '#FFC8DD'
        }
        else if (postColor == '1') {
            new_post.style.backgroundColor = '#BDE0FE'
        }
        else {
            new_post.style.backgroundColor = '#fff3b0'
        }
        new_post.classList.add('postBlock')

        new_post.innerHTML = add_task
        document.querySelector('.matrix').append(new_post)

        //get all the note objects
        post = document.getElementsByClassName('postBlock')



        var postCheckBox = document.createElement('input')
        postCheckBox.type = 'checkbox'
        postCheckBox.classList.add('postCheck')
        post[post.length - 1].append(postCheckBox)


        //add listener to each new checkbox
        var checkArray = document.getElementsByClassName('postCheck')

        var text_index = document.getElementsByClassName('unFinishTask').length - 1

        //remove the post if the checkbox is checked
        checkArray[text_index].addEventListener('change', function (event) {
            //console.log(event.target)
            checkBoxIndex = getIndexFromSet(checkArray, event.target)
            removeTask(this, checkBoxIndex)
        })

        startX = 0
        startY = 0

        post[post.length - 1].addEventListener('mousedown', dragStart)
    }
}


function dragStart(e) {
    e.preventDefault();
    //console.log(e)
    startX = e.clientX - e.target.offsetLeft
    startY = e.clientY - e.target.offsetTop
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', stopDrag)
}

function move(e) {
    e.target.style.cursor = 'grabbing'

    var area = document.getElementById('moveArea')
    //console.log(area)

    //set the moving range
    //can not get offsetHeight?
    let movearea = {
        left: area.offsetLeft,
        right: area.clientWidth + area.offsetLeft - e.target.clientWidth,
        top: area.offsetTop,
        bottom: area.clientHeight + area.offsetTop - e.target.clientHeight
    }

    x = e.clientX - startX
    y = e.clientY - startY

    x = Math.max(Math.min(x, movearea.right), movearea.left)
    y = Math.max(Math.min(y, movearea.bottom), movearea.top)

    e.target.style.left = x + 'px'
    e.target.style.top = y + 'px'

}

function stopDrag(e) {
    e.target.style.cursor = 'pointer'
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', stopDrag)
}

//make the post disappear
function removeTask(e, index_1) {
    //console.log(e)
    checkCount++
    e.setAttribute('id', checkCount.toString())
    var checkPost = e.parentNode

    //task = document.getElementsByClassName('unFinishTask')[index_1]

    finishTasklist.push(checkPost.textContent)
    document.getElementsByClassName('unFinishTask')[index_1].remove()

    unfinishTasklist.splice(index_1, 1)
    console.log(finishTasklist)

    //task.classList.remove('unFinishTask')
    //task.classList.add('finishTask')
    //document.querySelector('.finish').append(task)

    //console.log(finishTasklist)

    /*if (task.style.textDecoration == 'line-through 5px red') {
        task.style.textDecoration = 'none'
    }
    else {
        task.style.textDecoration = 'line-through 5px red'
    }*/

    checkPost.style.padding = '0px';
    checkPost.style.zIndex = '1100';
    checkPost.innerHTML = ''
    checkPost.style.backgroundColor = 'transparent'
    var catAni = document.createElement('div')
    catAni.classList.add('framImg')
    checkPost.append(catAni)


    var posX = checkPost.offsetLeft
    var posY = checkPost.offsetTop
    //console.log(posX + ',' + document.querySelector('.list').offsetLeft)

    var leftEnd = document.querySelector('.list').offsetLeft

    var buttomEnd = document.querySelector('.matrix').offsetTop + document.querySelector('.matrix').offsetHeight - checkPost.clientHeight
    checkPost.style.boxShadow = 'none';

    var fall_img = Math.floor(Math.random() * 3)
    console.log(fall_img)
    if (fall_img == '0') {
        catAni.style.backgroundImage = "url('fallCat1.png')"
    }
    else if (fall_img == '1') {
        catAni.style.backgroundImage = "url('fallCat3.png')"
    }
    else {
        catAni.style.backgroundImage = "url('fallCat5.png')"
    }

    var fallId = setInterval(fallAni, 1)
    var angle = Math.floor(Math.random() * 50)


    function fallAni() {
        checkPost.style.transform = 'rotate(' + angle + 'deg)'
        let addAni = 0
        if (posY >= buttomEnd) {
            if (addAni == 0) {
                checkPost.style.transform = 'rotate(0deg)'
                catAni.classList.add('frameAni')
                addAni = 1
            }
            if (posX >= leftEnd) {
                checkPost.remove()
                addFinishCat()
                clearInterval(fallId)
            }
            else {
                posX += 2
                checkPost.style.left = posX + 'px'
            }
        }
        else {
            posY += 2
            checkPost.style.top = posY + 'px'
        }
    }
}



function addFinishCat() {
    var new_cat = document.createElement('img')
    new_cat.classList.add('catHeadImg')
    //console.log(new_cat)

    //random cat img
    var cat_img = Math.floor(Math.random() * 3)
    //console.log(cat_img)
    if (cat_img == '0') {
        new_cat.src = 'cat_head_1.png'
    }
    else if (cat_img == '1') {
        new_cat.src = 'cat_head_2.png'
    }
    else {
        new_cat.src = 'cat_head_3.png'
    }

    document.querySelector('#CatBlock').append(new_cat)

    var showFinish = document.createElement('div')
    showFinish.classList.add('finished')

    showFinish.textContent = finishTasklist[document.getElementsByClassName('catHeadImg').length - 1]

    document.querySelector('#CatBlock').append(showFinish)

    new_cat.addEventListener('mouseover', function (event) {
        //console.log(showFinish)
        showFinish.style.display = 'flex'
        showFinish.style.top = event.target.offsetTop + 'px'
        showFinish.style.left = event.target.offsetLeft + 'px'
        showFinish.style.height = event.target.offsetHeight + 'px'
    })

    new_cat.addEventListener('mouseout', function () {
        showFinish.style.display = 'none'
    })

}

function getIndexFromSet(set, elm) {
    var setArr = [].slice.call(set);
    for (var i in setArr)
        if (setArr[i] == elm)
            return i;
}

function catFalling() {
    document.querySelector('.fallCatBlock').classList.add('fallCatBlockAni')
    document.querySelector('.frame').classList.add('frameAni')

}

function getToday() {
    const d = new Date()
    var day = d.getDate()

    //return 0-11 for month
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    document.getElementById('date').textContent = day + '/' + month + '/' + year
}