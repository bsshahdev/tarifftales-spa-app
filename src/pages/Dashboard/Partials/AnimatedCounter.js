import React, { useEffect } from "react";

export default function AnimatedCounter({rate}) {
    useEffect(() => {
        const counter = (EL) => {
            const duration = 1000; // Animate all counters equally for a better UX

            const start = parseInt(EL.textContent, 10); // Get start and end values
            const end = parseInt(EL.dataset.counter, 10); // PS: Use always the radix 10!

            if (start === end) return; // If equal values, stop here.

            const range = end - start; // Get the range
            let curr = start; // Set current at start position

            const timeStart = Date.now();

            const loop = () => {
                let elaps = Date.now() - timeStart;
                if (elaps > duration) elaps = duration; // Stop the loop
                const frac = elaps / duration; // Get the time fraction
                const step = frac * range; // Calculate the value step
                curr = start + step; // Increment or Decrement current value
                EL.textContent = Math.trunc(curr); // Apply to UI as integer
                if (elaps < duration) requestAnimationFrame(loop); // Loop
            };

            requestAnimationFrame(loop); // Start the loop!
        };

        document.querySelectorAll("[data-counter]").forEach(counter);
    }, [])

    return (
        <>
            {!Number.isInteger(rate) ? (
                <span className="count me-2">{rate}</span>
                ) : (
                <span data-counter={`${rate}`} className="count me-2">0</span>                
            )}
        </>
    )
}