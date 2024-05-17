document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById('content');
    const contentHtml = content.innerHTML;
    const pageHeight = 297; // A4 page height in mm
    const pagePaddingTop = 20; // Top padding in mm
    const pagePaddingBottom = 30; // Bottom padding in mm
    const footerHeight = 10; // Footer height in mm
    const effectivePageHeight = pageHeight - pagePaddingTop - pagePaddingBottom - footerHeight;

    content.style.display = 'none'; // Hide original content

    const container = document.createElement('div');
    document.body.appendChild(container);

    let currentPage = createPage();
    container.appendChild(currentPage);

    let contentDiv = document.createElement('div');
    contentDiv.innerHTML = contentHtml;
    let contentNodes = Array.from(contentDiv.childNodes);

    let tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    document.body.appendChild(tempDiv);

    contentNodes.forEach(node => {
        tempDiv.appendChild(node.cloneNode(true));

        if (tempDiv.scrollHeight > effectivePageHeight * 3.78) { // 1mm ≈ 3.78px
            currentPage.appendChild(createFooter());
            currentPage = createPage();
            container.appendChild(currentPage);

            tempDiv.innerHTML = '';
            tempDiv.appendChild(node.cloneNode(true));
        }

        currentPage.appendChild(node.cloneNode(true));
    });

    currentPage.appendChild(createFooter());
    tempDiv.remove();

    function createPage() {
        const page = document.createElement('div');
        page.className = 'page';
        return page;
    }

    function createFooter() {
        const footer = document.createElement('div');
        footer.className = 'footer';
        footer.innerHTML = 'Footer text here';
        return footer;
    }
});
