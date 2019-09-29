const grpc = require('grpc')

const PROTO_PATH = '../server/notes.proto'
const NoteService = grpc.load(PROTO_PATH).NoteService
const client = new NoteService('localhost:50051', grpc.credentials.createInsecure())

const newNote = {
    title: "new note",
    content: "beautsiful"
}

function list() {
    client.list({}, (error, notes) => {
        if (!error) {
            console.log('successfully fetch List notes');
            console.log(notes);
        } else {
            console.log(error);
        }
    })
    
}

client.insert(newNote, (error, note) => {
    if (!error) {
        console.log('New note created successfully', note);
    } else {
        console.error(error);
    }
})

client.delete({ id: '2' }, (error, note) => {
    if (!error) {
        console.log('Successfully deleted');
        list();
    } else {
        console.log(error)
    }
})