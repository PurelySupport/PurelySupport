const fns = require('./functions');

// test('Group page should grab all posts on componentDidMount', () => {
//     expect.assertions(1);
//     const url = 'http://localhost:3001/api/allposts'
//     return fns.getPosts(url).then( res => {
//         expect(res[1].postid).toEqual(5);
//     })
// })

// test('Post page should grab a post from database', () => {
//     expect.assertions(1);
//     const url = 'http://localhost:3001/api/getpost/2'
//     return fns.grabPost(url).then( res => {
//         expect(res.postid).toEqual(2);
//     })
// })

// test('Post page should grab posts comments on componentDidMount',() => {
//     expect.assertions(1);
//     const url = 'http://localhost:3001/api/getcomments/2'
//     return fns.getComments(url).then( res => {
//         expect(res[0].commentid).toEqual(2);
//     })
// }) 

// test('Messages should return a list of messages with a given userID', () => {
//     expect.assertions(1);
//     const url = 'http://localhost:3001/api/getconversation/3/2';
//     return fns.getConversation(url).then( res => {
//         expect(res[0].user_conversation[0].sender_id).toEqual(3)
//     })
// })

// test('Events should return a list of all events on componentDidMount', () => {
//     expect.assertions(1);
//     const url = 'http://localhost:3001/api/getallevents';
//     return fns.getEvents(url).then( res => {
//         expect(res[0].eventid).toEqual(1)
//     })
// })


// jacob
test('Should return messages for user 5', () => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/messages/5';
    return fns.getMessage(url).then( res => {
        expect(res[0].messageid).toEqual(412)
    })
})

test('Should return userinfo for user 3', () => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/getuserinfo/7';
    return fns.getUserInfo(url).then( res => {
        expect(res[0].user_details[0].userid).toEqual(7)
    })
})

test('Should return all diseases', () => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/getdiseases';
    return fns.getDiseases(url).then( res => {
        expect(res[0].diseaseid).toEqual(2717)
    })
})

test('Should return all interests', () => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/getinterests';
    return fns.getInterests(url).then( res => {
        expect(res[0].interestid).toEqual(1)
    })
})

test('Should return all groups', () => {
    expect.assertions(1);
    const url = 'http://localhost:3001/api/getgroups';
    return fns.getGroups(url).then( res => {
        expect(res[0].groupid).toEqual(2)
    })
})
