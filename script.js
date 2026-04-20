function printFinalReport() {
    // encodeURIComponent بەکار دێت بۆ ئەوەی ئەگەر ناوەکە کوردی بێت تێک نەچێت
    window.open(`report.html?user=${encodeURIComponent(currentUser)}`, '_blank');
}
