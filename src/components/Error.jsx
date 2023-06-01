const Error = ({children}) => {
    return (
        <div>
            <p
                className='bg-red-700 text-white font-bold mb-2 p-3 text-center uppercase rounded'>
                {children}
            </p>
        </div>
    )
}

export default Error