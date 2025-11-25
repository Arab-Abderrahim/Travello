export default function ImagePlaceholder({ type, className = "w-full h-32" }) {
    const getGradient = (type) => {
        switch (type) {
            case 'flight':
                return 'from-blue-400 to-blue-600';
            case 'hotel':
                return 'from-purple-400 to-purple-600';
            case 'trip':
                return 'from-green-400 to-green-600';
            case 'activity':
                return 'from-orange-400 to-orange-600';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    return (
        <div className={`${className} bg-gradient-to-br ${getGradient(type)} flex items-center justify-center rounded-lg`}>
            {/* No icon displayed - just gradient background */}
        </div>
    );
}
