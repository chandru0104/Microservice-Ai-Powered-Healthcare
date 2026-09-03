import { Oval } from 'react-loader-spinner'

export const Loading = () => (
    <div className="flex items-center justify-center w-full min-h-[400px]">
        <Oval
            height={80}
            width={80}
            color="#0f0097ff"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#8dcaeeff"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    </div>
)
