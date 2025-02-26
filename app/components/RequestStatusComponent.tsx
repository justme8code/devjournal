import {CheckCircleIcon, XCircleIcon} from "lucide-react";

interface RequestStatusComponentProps {
    error: boolean;
    success: boolean;
    successMessage?: string;
    errorMessage?: string;

}


export const RequestStatusComponent = ({error,success,successMessage,errorMessage}: RequestStatusComponentProps) => {
    return (
         <>
            {error && (
                <div className=" absolute inset-0  flex items-center justify-center">
                     <div className={"flex bg-white rounded-sm p-4 shadow-2xl border border-red-500"}>
                         <XCircleIcon className="text-red-600 mr-2"/>
                         <p className="text-red-600">{errorMessage || "Request not successful"}</p>
                     </div>
                </div>
            )}
            {success && (
                <div className=" absolute inset-0 flex items-center  justify-center">
                  <div className={"flex bg-white rounded-sm p-4 shadow-2xl border border-green-500"}>
                      <CheckCircleIcon className="text-green-600 mr-2"/>
                      <p className="text-green-600">{successMessage || "Request successful"}</p>
                  </div>
                </div>
            )}
        </>
    );
};
