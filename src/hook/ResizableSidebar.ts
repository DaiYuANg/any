import {useRef, useState} from "react";

interface UseResizableSidebarOptions {
    initialWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    disabled?: boolean;
}

export const useResizableSidebar = ({
                                        initialWidth = 240,
                                        minWidth = 160,
                                        maxWidth = 480,
                                        disabled = false,
                                    }: UseResizableSidebarOptions = {}) => {
    const [width, setWidth] = useState(initialWidth);
    const isResizing = useRef(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (disabled) return;

        isResizing.current = true;
        const startX = e.clientX;
        const startWidth = width;

        const onMouseMove = (moveEvent: MouseEvent) => {
            if (!isResizing.current) return;
            const delta = moveEvent.clientX - startX;
            const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + delta));
            setWidth(newWidth);
        };

        const onMouseUp = () => {
            isResizing.current = false;
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return {
        width,
        handleMouseDown,
        setWidth,
    };
};
