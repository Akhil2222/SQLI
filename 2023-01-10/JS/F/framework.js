//use data-blockId, ||blabla||
function createNew(block_id,objval){
    var block = document.querySelector(`[data-blockId="${block_id}"]`).innerHTML
    for(var i of Object.keys(objval)){
        block = block.replace(`||${i}||`,objval[i])
    }
    
    return block
}
document.querySelector('head').innerHTML += '<style>[data-blockId]{display:none;}'