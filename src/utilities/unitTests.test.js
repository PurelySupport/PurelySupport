const fns = require('./functions');

test('Group page should grab all posts on componentDidMount', () => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/allposts'
    return fns.getPosts(url).then( res => {
        expect(res[1].postid).toEqual(2);
    })
})

test('Post page should grab a post from database', () => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/getpost/2'
    return fns.grabPost(url).then( res => {
        expect(res[0].postid).toEqual(2);
    })
})

test('Post page should grab posts comments on componentDidMount',() => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/getcomments/2'
    return fns.getComments(url).then( res => {
        expect(res[0].commentid).toEqual(1);
    })
})