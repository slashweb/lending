import Spinner from 'react-spinkit';
import { useSelector } from 'react-redux'

export default function Loader() {
    const { isLoading } = useSelector((state) => ({
        isLoading: state.app.isLoading
    }))

    return (
    <>
    {isLoading &&
        <div className='absolute w-full h-full opacity-50 z-[100] flex justify-center items-center bg-black'>
            <Spinner name='cube-grid' color="white"/>
        </div>
    }
    </>)
}