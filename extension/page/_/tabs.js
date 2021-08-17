"use strict";
{
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = `tabs-${urlParams.get('r') || `tabs`}`;
    const hideContent = ($tabs) => {
        $tabs.querySelectorAll(`a[href]`).forEach(($a) => {
            if ($a === null)
                return;
            $a.parentElement?.classList.remove(`selected`);
            const href = $a.getAttribute(`href`) || ``;
            if (href === ``)
                return;
            document.querySelectorAll(href).forEach($elem => $elem.style.display = `none`);
        });
    };
    document.querySelectorAll(`.tabs`).forEach($tabs => {
        hideContent($tabs);
        $tabs.addEventListener(`click`, e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const $a = e.target.closest(`a[href]`);
            if ($a === null)
                return;
            hideContent($tabs);
            $a.parentElement?.classList.add(`selected`);
            const href = $a.getAttribute(`href`) || ``;
            document.querySelectorAll(href).forEach($elem => $elem.style.display = `block`);
            sessionStorage.setItem(itemName, href);
        }, true);
        const href = sessionStorage.getItem(itemName) || ``;
        ($tabs.querySelector(`a[href='${href}']`) || $tabs.querySelector(`a[href]`)).click();
    });
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVuc2lvbi9wYWdlL18vdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDQyxNQUFNLFNBQVMsR0FBSyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sUUFBUSxHQUFNLFFBQVEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUMzRCxNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtRQUMxQyxLQUFLLENBQUMsZ0JBQWdCLENBQWtCLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2pFLElBQUksRUFBRSxLQUFLLElBQUk7Z0JBQUUsT0FBTztZQUN4QixFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0MsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0MsSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFBRSxPQUFPO1lBQ3hCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBYyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQTtRQUM1RixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQTtJQUNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBYyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDbkMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQzdCLE1BQU0sRUFBRSxHQUFJLENBQUMsQ0FBQyxNQUFzQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4RCxJQUFJLEVBQUUsS0FBSyxJQUFJO2dCQUFFLE9BQU87WUFDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxRQUFRLENBQUMsZ0JBQWdCLENBQWMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUE7WUFDNUYsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkQsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3ZHLENBQUMsQ0FBQyxDQUFDO0NBQ0giLCJmaWxlIjoiZXh0ZW5zaW9uL3BhZ2UvXy90YWJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3BhZ2UuZC50c1wiIC8+XG57XG5cdGNvbnN0IHVybFBhcmFtcyAgID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblx0Y29uc3QgaXRlbU5hbWUgICAgPSBgdGFicy0ke3VybFBhcmFtcy5nZXQoJ3InKSB8fCBgdGFic2B9YDtcblx0Y29uc3QgaGlkZUNvbnRlbnQgPSAoJHRhYnM6IEhUTUxFbGVtZW50KSA9PiB7XG5cdFx0JHRhYnMucXVlcnlTZWxlY3RvckFsbDxIVE1MTGlua0VsZW1lbnQ+KGBhW2hyZWZdYCkuZm9yRWFjaCgoJGEpID0+IHtcblx0XHRcdGlmICgkYSA9PT0gbnVsbCkgcmV0dXJuO1xuXHRcdFx0JGEucGFyZW50RWxlbWVudD8uY2xhc3NMaXN0LnJlbW92ZShgc2VsZWN0ZWRgKTtcblx0XHRcdGNvbnN0IGhyZWYgPSAkYS5nZXRBdHRyaWJ1dGUoYGhyZWZgKSB8fCBgYDtcblx0XHRcdGlmIChocmVmID09PSBgYCkgcmV0dXJuO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oaHJlZikuZm9yRWFjaCgkZWxlbSA9PiAkZWxlbS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgKVxuXHRcdH0pO1xuXHR9XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KGAudGFic2ApLmZvckVhY2goJHRhYnMgPT4ge1xuXHRcdGhpZGVDb250ZW50KCR0YWJzKTtcblx0XHQkdGFicy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGUgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdGNvbnN0ICRhID0gKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbG9zZXN0KGBhW2hyZWZdYCk7XG5cdFx0XHRpZiAoJGEgPT09IG51bGwpIHJldHVybjtcblx0XHRcdGhpZGVDb250ZW50KCR0YWJzKTtcblx0XHRcdCRhLnBhcmVudEVsZW1lbnQ/LmNsYXNzTGlzdC5hZGQoYHNlbGVjdGVkYCk7XG5cdFx0XHRjb25zdCBocmVmID0gJGEuZ2V0QXR0cmlidXRlKGBocmVmYCkgfHwgYGA7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihocmVmKS5mb3JFYWNoKCRlbGVtID0+ICRlbGVtLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgKVxuXHRcdFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShpdGVtTmFtZSwgaHJlZik7XG5cdFx0fSwgdHJ1ZSk7XG5cdFx0XG5cdFx0Y29uc3QgaHJlZiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oaXRlbU5hbWUpIHx8IGBgO1xuXHRcdCgoJHRhYnMucXVlcnlTZWxlY3RvcihgYVtocmVmPScke2hyZWZ9J11gKSB8fCAkdGFicy5xdWVyeVNlbGVjdG9yKGBhW2hyZWZdYCkpIGFzIEhUTUxFbGVtZW50KS5jbGljaygpO1xuXHR9KTtcbn0iXX0=
