const JobCardSkeleton = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-14 h-14 bg-gray-200 rounded-xl" />

        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />

          {/* Company */}
          <div className="h-3 bg-gray-200 rounded w-1/3" />

          {/* Meta row */}
          <div className="flex gap-4 mt-3">
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <div className="h-9 bg-gray-200 rounded-xl w-28" />
            <div className="h-9 bg-gray-200 rounded-xl w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
