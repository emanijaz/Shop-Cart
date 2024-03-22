import React from 'react';
import { Skeleton } from '@mui/material';

const ProductSkeleton = () => {
    return (
        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
            <Skeleton variant="rectangular" width={200} height={250} />
            <div className="card-body">
                <Skeleton />
                <Skeleton width="60%" />
            </div>
        </div>
    );
};

export default ProductSkeleton;