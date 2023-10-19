document.addEventListener('DOMContentLoaded', () => {
    const PostBook = document.getElementById('postbook');
    const Submit = document.getElementById('submit');
    const BookList = document.getElementById('booklist');
    const BookReturn = document.getElementById('returnlist');

    // Function to display the list of books
    function displayBooks(notReturnedBooks, returnedBooks) {
        // Clear the existing content
        BookList.innerHTML = '' ;
        BookReturn.innerHTML = '' ;

        notReturnedBooks.forEach(book => {
            const bookItem = document.createElement('div');
            const takenOnTime = new Date(book.takenOnTime);
            const returnTime = new Date();
            const fineHours = Math.floor((returnTime - takenOnTime) / 3600000);
            const fine = fineHours * 10;
            bookItem.innerHTML = `
                <p>Book Name: ${book.postBook}</p>
                <p>Book Taken On: ${takenOnTime.toLocaleString()}</p>
                <p>Book Return Date: ${returnTime.toLocaleString()}</p>
                <p>Current Fine: Rs ${fine}</p>
                <button class="return-button" data-id="${book.id}">Return Book</button>
            `;


            // Attach an event listener to the "Return Book" button
            const returnButton = bookItem.querySelector('.return-button');
            returnButton.addEventListener('click', () => {
                const bookId = book.id;
                
                
                if(fine==0){
                    returnBook(bookId);
                    moveBookToReturn(book);
                    bookItem.style.display = 'none'; // Hide the book from the main list
                }else{
                    bookItem.innerHTML = `
                    <input placeholder=${fine}><br>
                    <button class="pay" id="pay">Pay Now</button>
                    `
                    const Pay = bookItem.querySelector('.pay');
                    Pay.addEventListener('click', () => {
                        returnBook(bookId);
                        moveBookToReturn(book);
                        bookItem.style.display = 'none'; 
                })
                }
            
            
            });

            BookList.appendChild(bookItem);
        });
        returnedBooks.forEach(book => {
            moveBookToReturn(book);
        });
    }

    function moveBookToReturn(book) {
        const returnItem = document.createElement('div');
        const takenOnTime = new Date(book.takenOnTime);
        const returnTime = new Date(book.returnOnTime);
        const fineHours = Math.floor((returnTime - takenOnTime) / 3600000);
        const fine = fineHours * 10;

        returnItem.innerHTML = `
            <p>Book Name: ${book.postBook}</p>
            <p>Book Taken On: ${takenOnTime.toLocaleString()}</p>
            <p>Book Return Date: ${returnTime.toLocaleString()}</p>
            <p>Fine Paid: Rs ${fine}</p>
            <p>-----------------------------</p>
        `;

        BookReturn.appendChild(returnItem);
    }

    // Fetch and display books when the page loads
    fetchBooks();

    function fetchBooks() {
        axios.get('http://localhost:3000/showbook')
            .then(response => {
                if (response.status === 200) {
                    const { notReturnedBooks, returnedBooks } = response.data;
                    displayBooks(notReturnedBooks, returnedBooks);
                }
            })
            .catch(err => console.error(err));
    }

    // Calculate the fine based on the taken and return date
    function calculateFine(takenDate, returnDate) {
        const takenTimestamp = new Date(takenDate).getTime();
        const returnTimestamp = new Date(returnDate).getTime();
        const elapsedHours = Math.max(0, (returnTimestamp - takenTimestamp) / 3600000 - 1); // Subtracting 1 hour as the first hour is free
        return elapsedHours;
    }

    // Function to return a book
    function returnBook(bookId) {
        axios.post('http://localhost:3000/returnbook', { id: bookId })
        .then(response => {
            if (response.status === 200) {
                // After successful return, fetch and display the updated list of books
                fetchBooks();
            } else {
                console.log('Unexpected status code:', response.status);
            }
        })
        .catch(err => console.error(err));
    }

    Submit.addEventListener('click', () => {
        const Bookvalue = PostBook.value;
        const currentTime = new Date().toLocaleString();

        axios.post('http://localhost:3000/createbook', {
            postBook: Bookvalue,
            takenOnTime: currentTime,
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Successfully posted a book.');
                    // Clear input fields
                    PostBook.value = '';
                    // Fetch and display the updated list of books
                    fetchBooks();
                } else {
                    console.log('Unexpected status code:', response.status);
                }
            })
            .catch(err => console.error(err));
    });
});
